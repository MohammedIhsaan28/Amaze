import db from "@/lib";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

interface FileIdProps {
    params:{
        fileid: string
    }
}

export default async function FileId({ params }: FileIdProps) {
    const { fileid } = await params;

    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user || !user.id) redirect(`/auth-callback?origin=/dashboard/${fileid}`)

    const file = await db.file.findFirst({
        where:{
            id:fileid,
            userId: user.id,
        }
    })
    if(!file) notFound()

    return(
        <div>
            {fileid}

        </div>
    )
}