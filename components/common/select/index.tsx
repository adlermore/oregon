import Select, { MultiValue, SingleValue } from "react-select";
import { Controller, useFormContext } from "react-hook-form";
import { Option, SelectCompProps } from "@/types/types";
import { getSelectStyles } from "@/utils/customizeHelpers";
import InputError from '../input/InputError';


const SelectField: React.FC<SelectCompProps> = ({
  label,
  options,
  required,
  name,
  value,
  placeholder,
  error,
  isDisabled,
  isLoading,
  isSearchable,
  isMulti = false,
  className,
  handleChange
}) => {

  const { control } = useFormContext();

  return (
    <div
      className={`relative form_block ${className ? className : ''}`}>
        {label && (
            <label className="mb-1 block lg:text-base text-sm font-medium text-tertiary">
                {label} {required && '*'}
            </label>
        )}

      <Controller
        control={control}
        name={name}
        defaultValue={value}
        render={({ field }) => {
          const fieldValue = isMulti ? Array.isArray(field.value) ? field.value : (field.value || '').split(',').map((value: string) => value.trim()) : field.value;
          const selectedOption = isMulti ? options.filter(option => fieldValue?.includes(option.id))
            : options?.find(option => fieldValue?.toString() && option.id === fieldValue);
          return (
            <Select
              {...field}
              instanceId={name}
              id={name}
              placeholder={placeholder}
              className="basic-single form-control"
              classNamePrefix="select"
              isSearchable={isSearchable ?? true}
              isClearable={true}
              isMulti={isMulti as false}
              closeMenuOnSelect={!isMulti}
              isDisabled={isDisabled || isLoading}
              hideSelectedOptions={false}
              value={selectedOption || null}
              options={options}
              menuPosition="fixed"
              onChange={(val: SingleValue<Option> | MultiValue<Option>) => {
                if (handleChange) {
                  handleChange(val as SingleValue<Option>);
                } else {
                  if (isMulti) {
                    if (Array.isArray(val)) {
                      field.onChange(val.map(c => c.id));
                    } else {
                      field.onChange([]);
                    }
                  } else {
                    if (val) {
                      if ("id" in val) {
                        field.onChange(val.id);
                      }
                    } else {
                      field.onChange('');
                    }
                  }
                }
              }}
              styles={getSelectStyles(isMulti)}

              theme={(theme) => ({
                ...theme,
                borderRadius: 8,
                colors: {
                  ...theme.colors,
                  primary25: 'rgb(25 26 42 / 20%)',
                  primary: 'rgb(25 26 42 / 40%)',
                  neutral50: '#667085'
                },
              })}
              getOptionLabel={(e: Option) => e.name}
              getOptionValue={(e: Option) => String(e.id)}
            />
          );
        }}
      />
      <InputError error={error || ''} />
    </div>
  );
};

export default SelectField;
