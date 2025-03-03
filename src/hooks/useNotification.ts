import { notification } from "antd";

type NotificationType = "success" | "error";

const useNotification = () => {
  const openNotification = (
    type: NotificationType,
    message: string,
    description: string,
    position:
      | "topLeft"
      | "topRight"
      | "bottomLeft"
      | "bottomRight" = "bottomRight"
  ) => {
    notification[type]({
      message,
      description,
      placement: position,
    });
  };

  return {
    openSuccess: (
      message: string,
      description: string,
      position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
    ) => openNotification("success", message, description, position),
    openError: (
      message: string,
      description: string,
      position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
    ) => openNotification("error", message, description, position),
  };
};

export default useNotification;
