/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import Button from './Button';
import { useEffect } from 'react';

const Form = ({ onSubmit, fields, onChangeSelect,defaultValues }) => {
  const { handleSubmit, register, watch, formState: { errors },reset } = useForm({
    defaultValues
  });
  useEffect(() => {
    // Check if the default values include a password and reset it if necessary
    if (defaultValues && defaultValues.password) {
      reset({ ...defaultValues, password: '' });
    }
  }, [defaultValues, reset]);
  useEffect(() => {
    return () => {
      // Reset form values when component unmounts
      reset();
    };
  }, [reset]);
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    onChangeSelect(name, value);
  };
  const password = watch('password', '')
  const validateConfirmPassword = (value) => {
    return value === password || 'Passwords must match';
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields &&
        fields.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            {field.type == 'select' ? (
              <select
                className={`px-3 py-2 bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${field.classes || ''}`}
                {...register(field.name, field.rules)}
                onChange={handleSelectChange}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className={`px-3 py-2 bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${field.classes || ''}`}
                type={field.type || 'text'}
                placeholder={field.placeholder || ''}
                disabled={field.disabled}
                {...register(field.name, {
                  ...field.rules,
                  validate: field.name === 'confirm_password' ? validateConfirmPassword : undefined,
                })}
              />
            )}
            {errors[field.name] && (
              <p style={{ color: 'red' }}>{errors[field.name].message}</p>
            )}
          </div>
        ))}
      <Button type="submit" textColor="text-white">Submit</Button>
    </form>
  );
};

export default Form;
