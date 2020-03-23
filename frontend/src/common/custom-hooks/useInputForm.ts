import { useState, useEffect } from "react";
import moment from "moment";

const useInputForm = (
  initialState: any,
  submitCallback?: any,
  closeCallback?: any,
  formReset?: any
) => {
  const [inputs, setInputs] = useState(initialState);

  useEffect(() => {
    setInputs(initialState);
  }, [initialState]);

  const handleSubmit = (e: any) => {
    if (e && e.preventDefault()) {
      e.preventDefault();
    }
    submitCallback(inputs);
    closeCallback();
  };

  const handleInputChange = (e: any) => {
    const target = e.target;
    e.persist();
    setInputs((prevState: any) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleInputReminderChange = (e: any) => {
    const target = e.target;
    const reminderDateTime = moment(inputs.startDate).subtract(
      target.value,
      "minutes"
    );
    e.persist();
    setInputs((prevState: any) => ({
      ...prevState,
      minutesBeforeStartToSendReminder: target.value,
      reminderTime: reminderDateTime,
    }));
  };

  const handleCheckedChange = (e: any) => {
    const target = e.target;
    let startTime = moment(inputs.startDate).startOf("day");
    let endTime = moment(inputs.endDate).endOf("day");
    e.persist();
    if (target.checked === true) {
      setInputs((prevState: any) => ({
        ...prevState,
        allDay: target.checked,
        startDate: startTime,
        endDate: endTime,
      }));
    } else {
      setInputs((prevState: any) => ({
        ...prevState,
        allDay: target.checked,
      }));
    }
  };

  const handleDateTimeInputChange = (e: any) => {
    if (e === null) {
      setInputs((prevState: any) => ({
        ...prevState,
        dueDate: null,
      }));
    } else {
      let dateValue = moment(e).toDate();
      setInputs((prevState: any) => ({
        ...prevState,
        dueDate: dateValue,
      }));
    }
  };

  const handleStartDateInputChange = (e: any) => {
    if (e === null) {
      setInputs((prevState: any) => ({
        ...prevState,
        startDate: null,
      }));
    } else {
      let date = moment(e).toDate();
      setInputs((prevState: any) => ({
        ...prevState,
        startDate: date,
      }));
    }
  };

  const handleEndDateInputChange = (e: any) => {
    if (e === null) {
      setInputs((prevState: any) => ({
        ...prevState,
        endDate: null,
      }));
    } else {
      let dateValue = moment(e).toDate();
      setInputs((prevState: any) => ({
        ...prevState,
        endDate: dateValue,
      }));
    }
  };

  const handleClose = (e: any) => {
    setInputs(formReset);
    closeCallback();
  };
  return {
    handleSubmit,
    handleInputChange,
    handleInputReminderChange,
    handleDateTimeInputChange,
    handleStartDateInputChange,
    handleEndDateInputChange,
    handleCheckedChange,
    handleClose,
    inputs,
  };
};
export default useInputForm;
