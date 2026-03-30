catch (err) {

  console.error("REGISTER ERROR:", err.response || err);

  setError(
    err.response?.data?.message ||
    "Registration failed. Try again."
  );

}
