import { toast } from "sonner";

export function openInstagramDM(productName?: string, price?: number) {
  const message = productName
    ? `Hello! I want to order this purse.\n\nProduct: ${productName}\nPrice: ₹${price?.toLocaleString('en-IN')}\n\nPlease confirm availability and delivery details.`
    : `Hello! I'm interested in ordering a purse from Panthi First Choice. Can you please share available options?`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(message).then(() => {
      toast("✓ Message copied! Paste it in Instagram DM");
    }).catch(() => fallbackCopy(message));
  } else {
    fallbackCopy(message);
  }

  setTimeout(() => {
    window.open('https://www.instagram.com/panthi_first_choice/', '_blank');
  }, 200);
}

function fallbackCopy(text: string) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  toast("✓ Message copied! Paste it in Instagram DM");
}
