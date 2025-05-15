import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "../ui/dialog"

import { Button } from "../ui/button"
import { Trash } from "@mynaui/icons-react";

export function DeleteDialog({ onDeleteProduct }) {
    async function deleteProduct() {
        onDeleteProduct();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action is irreversible.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={deleteProduct}>
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}