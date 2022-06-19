import Label from '@atoms/label';
import DescriptionHeader from '@molecules/description-header';
import React from 'react';

const TechnicianProjectDescription = () => {
	return (
		<div className="grid  md:grid-cols-3 gap-6">
			<div className="col-span-2">
				<DescriptionHeader value="Project Description" />
				<div className="w-full bg-white p-4 text-base md:text-xl	">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus tempora
					veritatis qui deserunt sed soluta, mollitia dolores blanditiis error aspernatur
					nulla. Optio qui iusto incidunt! Magni, ratione animi quos corrupti similique,
					magnam modi unde beatae ab dolorem dolor adipisci asperiores quia! Accusantium
					commodi dolor, expedita sunt facere ducimus? Iste, libero. Lorem ipsum dolor sit
					amet, consectetur adipisicing elit. Consequatur, ex maiores aliquid provident
					amet consectetur ut voluptate hic repellat, beatae sequi vero fugit explicabo
					vel dolorum dolorem aperiam nisi a accusamus tempore dolor quidem laudantium
					veniam tenetur! Voluptatem debitis ad tenetur corporis quas ullam, harum quae
					nesciunt sit a! Debitis.
				</div>
			</div>
			<div className="md:col-span-1 col-span-2">
				<DescriptionHeader value="Project Attachment" />
				<div className="w-full bg-white p-4 text-lg md:text-xl	">
					<Label value="3 Pic added" />
					<div className="images flex justify-between">
						<img
							src="https://media.istockphoto.com/photos/agile-method-picture-id1289758686?b=1&k=20&m=1289758686&s=170667a&w=0&h=LufHn4hATWiWXQQq0pTlnAvBAbN2uaTrLjK7Yo4wio8="
							width="100px"
							alt="img1"
						/>
						<img
							src="https://media.istockphoto.com/photos/agile-method-picture-id1289758686?b=1&k=20&m=1289758686&s=170667a&w=0&h=LufHn4hATWiWXQQq0pTlnAvBAbN2uaTrLjK7Yo4wio8="
							width="100px"
							alt="img2"
						/>
						<img
							src="https://media.istockphoto.com/photos/agile-method-picture-id1289758686?b=1&k=20&m=1289758686&s=170667a&w=0&h=LufHn4hATWiWXQQq0pTlnAvBAbN2uaTrLjK7Yo4wio8="
							width="100px"
							alt="img3"
						/>
					</div>
					<Label
						value="Link attached:"
						className="mt-4"
					/>
					<a
						href="https://www.youtube.com/watch?v=0SPwwpruGIA"
						className="text-xs md:text-sm text-[#43BFFF]"
					>
						https://www.youtube.com/watch?v=0SPwwpruGIA
					</a>
				</div>
			</div>
		</div>
	);
};

export default TechnicianProjectDescription;
