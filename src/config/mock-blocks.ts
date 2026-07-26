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
    type: "text",
    content: "Coming soon! The Anniversary Template.",
  },
  "sorry": {
    id: "mock-sorry",
    type: "text",
    content: "Coming soon! The Apology Template.",
  },
  "miss_you": {
    id: "mock-miss-you",
    type: "text",
    content: "Coming soon! The Miss You Template.",
  }
};
