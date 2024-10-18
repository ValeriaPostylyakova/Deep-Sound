import * as React from 'react';

type InputBlockProps = {
    label: string;
    inputType: string;
};

const InputBlock: React.FC<InputBlockProps> = ({ label, inputType }) => {
    return (
        <div className="registration__block">
            <label htmlFor="">{label}</label>
            <input type={inputType} />
        </div>
    );
};

export default InputBlock;
