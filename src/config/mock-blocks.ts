import { EditorBlock } from "@/features/editor/store/editor";

export const MOCK_TEMPLATE_BLOCKS: Record<string, EditorBlock> = {
  "valentine": {
    id: "mock-valentine",
    type: "valentine_template",
    content: "",
    metadata: {
      partnerName: "My Love",
      questionText: "Will you be my Valentine?",
      yesButtonText: "Yes!",
      noButtonText: "No",
      successMessage: "Yayy! I love you! ❤️",
      gifUrl1: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTV5Nzd5cndxdDFxYm8zYXdxZ2hxdHQyYTV2amc5MTJhMnNhZWxyciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LnjD7MN2RtpEIAtSls/giphy.gif",
      gifUrl2: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0MmlkNjIzbWNxdjF3aGRyZjNha2l0Z3J4NDV5dDRyZHhtMnhqMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif"
    }
  },
  "birthday": {
    id: "mock-birthday",
    type: "birthday_template",
    content: "",
    metadata: {
      birthdayName: "Alex",
      birthdayAge: "25",
      customMessage: "Wishing you a lifetime of happiness, joy, and endless surprises! Have a wonderful day!",
      giftGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjUzYzZhMzBiMmQ5MGI2YTkzMzE2YmY2MTI2MzcxYzcxZmE1ZGU3ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRv0ThflsHCqDrG/giphy.gif",
      cakeGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTNjOWUzNGMwMDRkNWJjZGRiZjZhNDZmNjUyZWEzMmQyMTA1NWFmZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LMB3W50H8y5GOO1hg/giphy.gif",
      cardColor: "bg-fuchsia-600",
    }
  },
  "anniversary": {
    id: "mock-anniversary",
    type: "anniversary_template",
    content: "",
    metadata: {
      coupleNames: "Rahul & Priya",
      years: "5",
      anniversaryDate: "Oct 12, 2021",
      message: "Every love story is beautiful, but ours is my favorite. Happy Anniversary!",
      timelineEvents: [
        { year: "2018", title: "First Met", image: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=2940&auto=format&fit=crop" },
        { year: "2021", title: "Tied the Knot", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2940&auto=format&fit=crop" },
      ],
      coverPhoto: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2940&auto=format&fit=crop",
    }
  },
  "sorry": {
    id: "mock-sorry",
    type: "sorry_template",
    content: "",
    metadata: {
      recipientName: "My Friend",
      senderName: "Me",
      message: "I messed up and I'm really sorry. Please forgive me?",
      promiseText: "I promise to do better and never hurt you again.",
      sadGifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHk1NjhzMnlybnR6ZWg4OTMwcThnbWdmeGk1Nnd2M2NxdHJqMXZpZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L95W4wv8nnb9K/giphy.gif",
      happyGifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0MmlkNjIzbWNxdjF3aGRyZjNha2l0Z3J4NDV5dDRyZHhtMnhqMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif"
    }
  },
  "miss_you": {
    id: "mock-miss-you",
    type: "miss_you_template",
    content: "",
    metadata: {
      recipientName: "My Love",
      senderName: "Me",
      message: "Days feel so long without you. I miss you more than words can say.",
      photos: [
        "https://images.unsplash.com/photo-1516239482977-b550ba7253f2?q=80&w=2940&auto=format&fit=crop"
      ]
    }
  }
};
