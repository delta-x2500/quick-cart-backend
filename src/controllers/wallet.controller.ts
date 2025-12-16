import { Request, Response } from "express";
import prisma from "../../lib/prisma.js";

// Create Wallet
export const createWallet = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const { userId } = req.body;
    const wallet = await prisma.wallet.create({
      data: {
        userId,
      },
    });
    res.status(201).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Wallet Balance
export const getWalletBalance = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const { userId } = req.params;
    let wallet = await prisma.wallet.findUnique({
      where: {
        userId,
      },
    });

    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: {
          userId,
        },
      });
    }

    res.json({ balance: wallet.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Wallet Balance
export const updateWalletBalance = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;

    const wallet = await prisma.wallet.findUnique({
      where: {
        userId,
      },
      // TODO: Add transactions relation to Wallet model in schema if transaction tracking is needed
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    const updatedWallet = await prisma.wallet.update({
      where: {
        userId,
      },
      data: {
        balance: wallet.balance + amount,
        // TODO: Transaction tracking disabled - add to schema first
        // transactions: {
        //   create: {
        //     type: amount >= 0 ? "TOPUP" : "PURCHASE",
        //     amount: Math.abs(amount),
        //   },
        // },
      },
    });

    res.json(updatedWallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Transaction History
// TODO: Disabled - requires transactions relation in Wallet model
export const getTransactionHistory = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const { userId } = req.params;
    // Transaction history feature not implemented yet
    // Requires adding Transaction model and relation to Wallet in Prisma schema
    return res.status(501).json({
      error: "Transaction history not implemented",
      message: "This feature requires database schema updates",
    });

    /* Original implementation - commented out until schema is updated
    const wallet = await prisma.wallet.findUnique({
      where: {
        userId,
      },
      include: {
        transactions: true,
      },
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    res.json({ transactions: wallet.transactions });
    */
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
