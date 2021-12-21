const {response} = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

  const events = await Event.find()
                            .populate('user', 'name');

  res.json({
    ok: true,
    events
  });

};

const createEvent = async (req, res = response) => {

  const {id} = req.body;

  let event = await Event.findOne({id});

    if(event) {
      return res.status(400).json({
        ok: false,
        msg: "It's already on your wishlist!",
      });
    }

  event = new Event(req.body)

  try {

    event.user = req.uid;

    await event.save();
 
    res.json({
      ok: true,
      event: event
    });
    
  } catch (err) {
    
    console.warn(err);

    res.status(500).json({
      ok: false,
      msg: 'error'
    });

  }

};

const updateEvent = async (req, res = response) => {

  const  eventId = req.params.id 
  const uid = req.uid;

  try {
    
    const event = await Event.findById(eventId);

    if(!event) {
      return res.status(404).json({
        ok: false,
        msg: 'El evento no existe'
      });
    }

    if(event.user.toString() !== uid) {
      return res.status(404).json({
        ok: false,
        msg: 'No puede editar este evento'
      });
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

    res.json({
      ok: true,
      event: updatedEvent
    });

  } catch (err) {

    console.warn(err);

    res.status(500).json({
      ok: false,
      msg: 'error'
    });
    
  }

};

const deleteEvent = async (req, res = response) => {

  const  eventId = req.params.id 
  const uid = req.uid;

  try {
    
    const event = await Event.findById(eventId);

    if(!event) {
      return res.status(404).json({
        ok: false,
        msg: 'El evento no existe'
      });
    }

    if(event.user.toString() !== uid) {
      return res.status(404).json({
        ok: false,
        msg: 'No puede eliminar este evento'
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
      event: deletedEvent
    });

  } catch (err) {

    console.warn(err);

    res.status(500).json({
      ok: false,
      msg: 'error'
    });
    
  }

};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};