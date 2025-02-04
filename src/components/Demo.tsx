import notFound from "../../public/assets/images/notfound.jpg"
export default function Demo() {
    return (
        <section className=" grow flex flex-col px-8  md:p-10 gap-5  " style={{
            backgroundImage: `url(${notFound})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat"

        }}>
            <h2 className="text-6xl font-bold text-blue-700 my-4">Sorry...</h2>
            <h2 className="md:text-3xl  font-bold text-red-600">This page is under development</h2>
        </section>
    )
}
