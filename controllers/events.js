const {response} = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

  const events = await Event.find()
                            .populate('user', 'name');

                            

  const uid = req.uid;

  const actualEvents = events.filter(event => event.user._id.toString() === uid)
  .sort((a, b) => b.date - a.date );

  res.json({
    ok: true,
    actualEvents
  });

};

const createEvent = async (req, res = response) => {

  const event = new Event( req.body );

    try {

      event.user = req.uid;
      const saveEvent = await event.save();

        res.json({
            ok: true,
            event: saveEvent
        })


    } catch (error) {
        console.log(error)
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