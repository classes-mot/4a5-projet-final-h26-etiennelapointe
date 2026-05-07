import React from "react";
import { useTranslation } from "react-i18next";

const ErrorMsg = ({ message, onClose }) => {
  const { t } = useTranslation();
  if (!message) return null;

  return (
    <div>
      <h1>{t("errorTitle")}</h1>
      <p>{message}</p>
      <button onClick={onClose}>{t("close")}</button>
    </div>
  );
};

export default ErrorMsg;
