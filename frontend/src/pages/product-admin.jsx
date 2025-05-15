import { useEffect, useState } from "react";
import { DeleteDialog } from "../components/dialogs/delete-dialog";
import { axiosAuthInstance } from "../axiosConfig";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import { SectionTitle } from "../components/section-title";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

export function ProductAdmin() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    async function fetchProducts() {
        try {
            const response = await axiosAuthInstance('/api/products');
            setProducts(response.data);
        } catch (error) {
            setError('Error fetching products');
        }
    }

    async function deleteProduct(id) {
        try {
            await axiosAuthInstance.delete(`/api/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            window.alert('Error deleting product:', error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <section className="container mx-auto space-y-4 bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/product">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage href="admin">Product management</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <SectionTitle title="Product Management" />

            <div className="mx-auto w-full max-w-6xl overflow-x-auto">
                <div className="flex w-full justify-end mb-4">
                    <Link to="create-product">
                        <Button size="sm" variant="default">
                            <Plus />
                            Product
                        </Button>
                    </Link>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow>
                                <TableCell className="flex items-center space-x-4">
                                    <div className="flex items-center aspect-square w-16 h-16 shrink-0">
                                        <img className="h-full w-full max-h-full object-cover rounded-md" src={product.imageUrl} alt={product.name} />
                                    </div>
                                    <span>{product.name}</span>
                                </TableCell>
                                <TableCell>{product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>
                                    <Link to={`update`} state={{ ...product }} relative="path">
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <DeleteDialog onDeleteProduct={() => deleteProduct(product._id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}