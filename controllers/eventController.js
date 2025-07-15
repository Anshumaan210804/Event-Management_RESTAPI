const Event = require("../models/Event");
const User = require("../models/User");


const createEvent = async (req, res) => {
  try {
    const { title, dateTime, location, capacity } = req.body;

    if (!title || !dateTime || !location || !capacity)
      return res.status(400).json({ error: "All fields are required" });

    if (capacity <= 0 || capacity > 1000)
      return res.status(400).json({ error: "Capacity must be 1-1000" });

    const event = new Event({ title, dateTime, location, capacity });
    await event.save();
    res.status(201).json({ message: "Event created", eventId: event._id });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


const getEventDetails = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("registrations");
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


const registerUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);
    const user = await User.findById(userId);

    if (!event || !user)
      return res.status(404).json({ error: "Event or User not found" });

    if (event.dateTime < new Date())
      return res.status(400).json({ error: "Cannot register for past event" });

    if (event.registrations.includes(userId))
      return res.status(409).json({ error: "Already registered" });

    if (event.registrations.length >= event.capacity)
      return res.status(400).json({ error: "Event is full" });

    event.registrations.push(userId);
    await event.save();
    res.json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


const cancelRegistration = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ error: "Event not found" });

    const index = event.registrations.indexOf(userId);
    if (index === -1)
      return res.status(400).json({ error: "User not registered for event" });

    event.registrations.splice(index, 1);
    await event.save();
    res.json({ message: "Registration cancelled" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


const listUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({ dateTime: { $gte: new Date() } });
    events.sort((a, b) => {
      const dateCompare = new Date(a.dateTime) - new Date(b.dateTime);
      if (dateCompare !== 0) return dateCompare;
      return a.location.localeCompare(b.location);
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


const getEventStats = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const total = event.registrations.length;
    const remaining = event.capacity - total;
    const percent = ((total / event.capacity) * 100).toFixed(2);

    res.json({
      totalRegistrations: total,
      remainingCapacity: remaining,
      percentageUsed: `${percent}%`,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  createEvent,
  getEventDetails,
  registerUser,
  cancelRegistration,
  listUpcomingEvents,
  getEventStats,
};
