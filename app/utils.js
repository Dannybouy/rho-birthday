export const heroSectionTexts = [
  "REVEREND HELEN OYEGOKE, A JOY TO",
  "BEHOLD. AN EMBODIMENT OF REVERENCE",
  "HONOUR AND OBEDIENCE",
];

export const testimoniesHeaderText = [
  "How has Mummy",
  "Helen's life blessed you?",
];

export const testimonyText = [
  "Mummy has been a blessing to us in many ways, we believe only the",
  "Lord can work this! Tell us, how have you been blessed by mummy",
];

export const viewTestimoniesHeaderText = [
  "Read Testimonies about",
  "Mummy Helen",
];

export function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 60) {
    return `${Math.floor(secondsPast)}s ago`;
  }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)}m ago`;
  }
  if (secondsPast <= 86400) {
    return `${Math.floor(secondsPast / 3600)}h ago`;
  }
  if (secondsPast > 86400) {
    const day = Math.floor(secondsPast / 86400);
    return day === 1 ? `${day} day ago` : `${day} days ago`;
  }
}
