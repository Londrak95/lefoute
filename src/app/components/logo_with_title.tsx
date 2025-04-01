import Image from 'next/image'
import Link from 'next/link'


const nameToLogo = {
	"Olympique de Marseille": "om.jpg"
}

export default function LogoWithTitle({ name, link }) {
	const logo = nameToLogo[name]

	return (
		<div className="flex flex-row">
			{ logo && <Image src={`/teamLogos/${logo}`} alt={`Logo of ${name}`} width="56" height="56" /> }
			{ link
				? <Link href={link} target={"_blank"} className="content-center"> {name} </Link>
				: <h2 className="content-center"> {name} </h2>
			}
		</div>
	)
}