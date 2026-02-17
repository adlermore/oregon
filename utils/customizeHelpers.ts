import { GroupBase, StylesConfig } from "react-select";
import { Option } from "@/types/types";

export function getSelectStyles (isMulti?:boolean, disabled?: boolean) {
     const customStyles: StylesConfig<Option, boolean, GroupBase<Option>> = {
        control: (provided) => ({
            ...provided,
            fontSize: 14,
            color: '#667085',
            borderColor: '#D0D5DD',
            boxShadow: 'none',
            minHeight: '44px',
            height: '44px'
        }),

        valueContainer: (provided, state) => ({
            ...provided,
            height: '44px',
            padding: '0 11px',
            fontWeight: '400',
            ...(isMulti && {
                top: state.getValue().length > 0 ? '-2px' : '50%',
                transform: state.getValue().length > 0 ? 'translateY(0)' : 'translateY(-50%)',
                flexWrap: 'unset'
            })
        }),

        input: (provided) => ({
            ...provided,
            margin: '0px',
            padding: 0,
            color: disabled ? '#999999' : '#000000',
            visibility: 'visible'
        }),

        indicatorSeparator: () => ({
            display: 'none'
        }),

        indicatorsContainer: (provided) => ({
            ...provided,
            height: '44px'
        }),

        option: (styles, state) => ({
            ...styles,
            color: '#000000',
            backgroundColor: state.isSelected ? "#2b7abf4d" : "white",
            ":hover": {
                backgroundColor: state.isSelected ? '#2b7abf4d' : '#2b7abf17'
            }

        }),
        menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
        }),
        menu: (base) => ({
            ...base,
            zIndex: '9',
            left: 'auto',
            right: 0,
            minWidth: '100%',
            maxWidth: 'min(320px,90vw)',
        }),
        menuList: (base) => ({
            ...base,
            maxHeight: '240px',
            overflowY: 'auto',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D0D5DD',
            borderRadius: '8px',
            scrollbarWidth: 'thin',
        })
    };

     return customStyles;
}

