import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import SelectField from '../../../../components/Form-control/SelectField';

ProductSort.propTypes = {
    onChange: PropTypes.func,
};

function ProductSort(props) {

    const { onChange } = props
    const options = [
        { value: "title", name: "Tên từ A-Z" },
        { value: "-title", name: "Tên từ Z-A" },
        { value: "price", name: "Giá từ thấp đến cao" },
        { value: "-price", name: "Giá từ thấp đến cao" },
    ]
    const form = useForm({
        defaultValues: {
            value: '',
        },
    })

    const handleChange = (value) => {
        if (onChange) {
            onChange(value)
        }
    }

    return (
        <div>
            <SelectField
                form={form}
                label={"Sort"}
                name={"Sort"}
                onChange={handleChange}
                options={options} 
            />
        </div>
    );
}

export default ProductSort;