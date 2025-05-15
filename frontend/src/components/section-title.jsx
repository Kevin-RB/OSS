export function SectionTitle({ title }) {
    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            <hr className="border-t-2 border-gray-300 mt-2" />
        </div>
    );
}