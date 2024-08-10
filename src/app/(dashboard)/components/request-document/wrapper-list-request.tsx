import RequestItem from "./request-item"
import { type RequestItemProps } from "./type"

interface ListRequestProps {
    data: RequestItemProps[]
}

const WrapperListRequest = ({ data }: ListRequestProps) => {
    return (
        <div className="flex flex-col space-y-3">
            {data.length > 0 ? (
                data.map((item) => <RequestItem {...item} key={item.id} />)
            ) : (
                <div className="flex h-48 w-full items-center justify-center">
                    <p>Belum ada data request masuk</p>
                </div>
            )}
        </div>
    )
}

export default WrapperListRequest
