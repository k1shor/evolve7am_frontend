import Link from "next/link";
import { useRouter } from "next/navigation";

const pageNotFound = () => {
    const router = useRouter()

    const goBack = () => {
        router.back()
    }

    return (<>
        <div className="p-5 text-center text-xl">
            The page you are looking does not exits. Go to
            <Link href={'/'}> HOME.</Link>
            <button onClick={goBack}> Go Back</button>
        </div>
    </>);
}

export default pageNotFound;