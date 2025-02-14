import React from 'react';
import Image from 'next/image';

type CommonButtonProps = {
    onClick?: () => void;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    text: string;
    className?: string;
    iconSrc?: string;
    disabled?: boolean;
};

const Button: React.FC<CommonButtonProps> = ({
     onClick,
     loading = false,
     type = 'button',
     text,
     className = '',
     iconSrc,
     disabled = false,
 }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex justify-center items-center w-1/2 py-1 h-10 rounded-3xl border-2 border-gray-200 ${className}`}
            disabled={loading || disabled}
        >
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="spinner"></div>
                    {/*<span className="ml-2">ロード中...</span>*/}
                </div>
            ) : (
                <>
                    {iconSrc && <Image className="mr-2" alt="icon" src={iconSrc} width={20} height={20} />}
                    <span>{text}</span>
                </>
            )}
        </button>
    );
};

export default Button;