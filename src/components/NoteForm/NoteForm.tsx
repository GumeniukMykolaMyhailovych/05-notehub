import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onSubmit: (values: {
    title: string;
    content: string;
    tag: string;
  }) => void;
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Title is required"),

  content: Yup.string().max(500, "Max 500 characters"),

  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

function NoteForm({ onSubmit, onClose }: NoteFormProps) {
  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        tag: "Todo",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          {/* TITLE */}
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>

            <Field
              id="title"
              name="title"
              type="text"
              className={css.input}
            />

            <ErrorMessage
              name="title"
              component="span"
              className={css.error}
            />
          </div>

          {/* CONTENT */}
          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>

            <Field
              as="textarea"
              id="content"
              name="content"
              rows={6}
              className={css.textarea}
            />

            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          {/* TAG */}
          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>

            <Field as="select" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>

            <ErrorMessage
              name="tag"
              component="span"
              className={css.error}
            />
          </div>

          {/* ACTIONS */}
          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NoteForm;