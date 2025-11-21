import { Laptop, Smartphone, Tablet, Tv } from "lucide-react";

export function getBrowserInfo(userAgent: UAParser.IResult | null) {
  if (userAgent === null) return "Unknown Device";
  if (userAgent.browser.name === null && userAgent.os.name === null)
    return "Unknown Device";

  if (userAgent.browser.name === null) return userAgent.os.name;
  if (userAgent.os.name === null) return userAgent.browser.name;

  return `${userAgent.browser.name}, ${userAgent.os.name}`;
}

export function getDeviceIconByType(type?: string) {
  switch (type) {
    case "mobile":
      return Smartphone;
    case "tablet":
      return Tablet;
    case "smarttv":
      return Tv;
    default:
      return Laptop;
  }
}
