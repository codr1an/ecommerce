const editValidateForm = (formData) => {
  let errors = {
    email: "",
  };

  if (!formData.email) {
    errors.email = "* E-Mail can't be empty";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "* Invalid E-Mail";
  }

  return errors;
};

const isValidEmail = (email) => {
  // email validation regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

module.exports = { editValidateForm, isValidEmail };
