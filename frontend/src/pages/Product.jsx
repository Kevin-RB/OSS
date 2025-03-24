import { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { AxiosError } from 'axios';
import { FieldError } from '../components/field-error';

export default function Product() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        imageUrl: ''
    });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/products', formData);

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            // Clear form after successful submission
            setFormData({
                name: '',
                price: '',
                description: '',
                imageUrl: ''
            });
            alert('Product added successfully!');
        } catch (error) {
            if (error instanceof AxiosError && error.response && error.response.data) {
                setError(error.response.data?.error);
                return;
            }
            alert('Failed to add product');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 bg-white p-6 shadow-md rounded flex flex-col space-y-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}
                        className="w-full p-2 border rounded"
                    />
                    <FieldError error={error?.name?._errors} />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        min={0}
                        id="price"
                        value={formData.price}
                        onChange={(e) => { setFormData({ ...formData, price: e.target.value }) }}
                        className="w-full p-2 border rounded"
                    />
                    <FieldError error={error?.price?._errors} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={formData.description}
                        onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}

                        className="w-full p-2 border rounded"
                    />
                    <FieldError error={error?.description?._errors} />
                </div>
                <div>
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={formData.imageUrl}
                        onChange={(e) => { setFormData({ ...formData, imageUrl: e.target.value }) }}

                        className="w-full p-2 border rounded"
                    />
                    <FieldError error={error?.imageUrl?._errors} />
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded-md w-full h-10">Add Product</button>
            </form>
        </div>
    );
}