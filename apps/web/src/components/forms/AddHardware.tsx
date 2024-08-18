"use client"

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"

import Button  from "@/components/ui/Button";
import Box from "@/components/ui/Box";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type Inputs = {
    name: string,
    location: string,
    hashRate: string,
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

interface AddHardwareProps {
    action?: string;
    submit?: () => void;
    data?: any;
}

const AddHardware: React.FC<AddHardwareProps> = ({
    action = 'add',
    submit = () => {},
    data = {}
}) => {

    const auth = useAuth();
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (formData) => {
        const url = action === 'add' ? `${API_HOST}/mining-hardware` : `${API_HOST}/mining-hardware/${data.id}`; 
        fetch(url, {
              method: action === 'add' ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth?.token}`
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // refresh and close modal
                submit();
            }
        ).catch((error) => {
            console.error('Error:', error);
        });

    }

    return (
        <div className="items-center mt-10">
            <Box className="p-5">
                {action === 'add' && <h2 className="text-2xl text-center mb-5">Add Hardware</h2>}
                {action === 'edit' && <h2 className="text-2xl text-center mb-5">Edit Hardware</h2>}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-2">
                    <Input type="text" placeholder="Name" {...register("name", { required: true })} defaultValue={data.name} />
                    <Input type="text" placeholder="Location" {...register("location", { required: true })} defaultValue={data.location} />
                    <Input type="text" placeholder="Hashrate" {...register("hashRate", { required: true })} defaultValue={data.hashRate} />
                    <Button type="submit" className="mt-3">Save</Button>
                </form>
            </Box>
        </div>
    );
}

export default AddHardware;

