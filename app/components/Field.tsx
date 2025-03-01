import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent } from 'react';

const Field = (props: FieldProps) => {
    return (
        <div className={props.className}>
            <Label htmlFor={props.id}>{props.label ?? props.placeholder} {!!props.required && <span className='text-red-500'>*</span>}</Label>
            <Input onChange={props.onChange} required={!!props.required} className='mt-2' id={props.id} name={props.name} type={props.type} placeholder={props.placeholder} />
        </div>
    )
}

interface FieldProps {
    id: string,
    name?: string;
    placeholder: string;
    label?: string;
    type: 'text' | 'number' | 'url',
    className?: string;
    required?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void

}

export default Field