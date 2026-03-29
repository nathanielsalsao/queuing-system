import express, { Request, Response } from 'express';
import Queue from '../models/Queue';

const router = express.Router();

/**
 * @route   POST /api/queue/add
 * @desc    Add a new customer to the queue
 */
router.post('/add', async (req: Request, res: Response) => {
  try {
    const { customerName, serviceType } = req.body;

    // Smart logic: Get the highest current ticket number and add 1
    const lastTicket = await Queue.findOne().sort({ createdAt: -1 });
    const nextTicketNumber = lastTicket ? lastTicket.ticketNumber + 1 : 1;

    const newTicket = new Queue({
      customerName,
      serviceType,
      ticketNumber: nextTicketNumber,
      status: 'waiting'
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (err) {
    res.status(500).json({ message: "Error adding to queue", error: err });
  }
});

/**
 * @route   GET /api/queue
 * @desc    Get all tickets currently in the queue
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const tickets = await Queue.find().sort({ createdAt: 1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching queue" });
  }
});

/**
 * @route   PATCH /api/queue/next
 * @desc    Call the next person in line (Changes status from waiting to called)
 */
router.patch('/next', async (req: Request, res: Response) => {
  try {
    // Find the oldest person who is still 'waiting'
    const nextInLine = await Queue.findOneAndUpdate(
      { status: 'waiting' },
      { status: 'called' },
      { new: true, sort: { createdAt: 1 } }
    );

    if (!nextInLine) {
      return res.status(404).json({ message: "No one is currently waiting." });
    }

    res.json({ message: `Now calling: ${nextInLine.customerName}`, ticket: nextInLine });
  } catch (err) {
    res.status(500).json({ message: "Error updating queue" });
  }
});

export default router;