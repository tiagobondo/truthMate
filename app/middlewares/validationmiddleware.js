const validateData = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.inner.map((e) => ({
      //field: e.path,
      message: e.message
    }));
    return res
      .status(401)
      .send({ errors: errors })
  }
}

export { validateData };