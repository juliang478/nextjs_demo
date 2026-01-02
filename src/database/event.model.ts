import mongoose, { Document, Schema } from "mongoose";

// Type for Event document combining Mongoose Document with custom fields
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: "online" | "offline" | "hybrid";
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Event overview is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Event image URL is required"],
    },
    venue: {
      type: String,
      required: [true, "Event venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
    },
    mode: {
      type: String,
      enum: {
        values: ["online", "offline", "hybrid"],
        message: "Mode must be online, offline, or hybrid",
      },
      required: [true, "Event mode is required"],
    },
    audience: {
      type: String,
      required: [true, "Target audience is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Event agenda is required"],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "Agenda must contain at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Event organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Event tags are required"],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "Tags must contain at least one item",
      },
    },
  },
  { timestamps: true }
);

// Generate URL-friendly slug from title and normalize date/time formats
eventSchema.pre("save", async function (next) {
  // Generate slug only if title is new or has changed
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Remove multiple consecutive hyphens
  }

  // Normalize date to ISO format (YYYY-MM-DD)
  if (this.isModified("date")) {
    const dateObj = new Date(this.date);
    if (isNaN(dateObj.getTime())) {
      return next(new Error("Invalid date format. Use YYYY-MM-DD or ISO format."));
    }
    this.date = dateObj.toISOString().split("T")[0];
  }

  // Normalize time to HH:MM format
  if (this.isModified("time")) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(this.time)) {
      return next(new Error("Invalid time format. Use HH:MM format (24-hour)."));
    }
  }

  next();
});

// Add compound index for better query performance
eventSchema.index({ slug: 1, createdAt: -1 });

export const Event =
  mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);
