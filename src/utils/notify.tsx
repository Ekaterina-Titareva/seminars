import toast from "react-hot-toast";

const notify = (text: string, type: "success" | "error") => {
  if (type === "success") {
    toast.success(text, {
      style: {
        border: "1px solid var(--Brand-Primary-1000-color)",
        backgroundColor: "var(--Brand-Secondary-200-color)",
        color: "var(--Brand-Primary-1000-color)",
        padding: "12px",
        fontSize: "16px",
      },
      iconTheme: {
        primary: "var(--Brand-Primary-1000-color)",
        secondary: "var(--Text-White-1000-color)",
      },
    });
  } else if (type === "error") {
    toast.error(text, {
      style: {
        backgroundColor: "var(--Brand-Primary-1000-color)",
        color: "var(--Text-White-1000-color)",
        padding: "12px",
        fontSize: "16px",
      },
      iconTheme: {
        primary: "var(--Text-White-1000-color)",
        secondary: "var(--Brand-Primary-1000-color)",
      },
    });
  }
};

export default notify;
