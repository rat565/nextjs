export default function UserProfile({params}:any) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1>Profile{params.id}</h1>
        </div>
    );
}