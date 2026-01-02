import mongoose, { Document, Schema, Types } from "mongoose";
import { Event } from "./event.model";

// Type for Booking document combining Mongoose Document with custom fields
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
  },
  { timestamps: true }
);

// Add index on eventId for faster queries
bookingSchema.index({ eventId: 1 });

// Verify that referenced event exists before saving
bookingSchema.pre("save", async function (next) {
  if (this.isModified("eventId") || this.isNew) {
    try {
      const event = await Event.findById(this.eventId);
      if (!event) {
        return next(new Error("Referenced event does not exist"));
      }
    } catch (error) {
      return next(
        new Error("Invalid event ID or database error during validation")
      );
    }
  }

  next();
});

export const Booking =
  mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", bookingSchema);
