import type { ReactNode } from "react";

const PageHeader = ({ title, description, action }: { title: string; description?: string; action?: ReactNode }) => (
	<div className="flex flex-wrap items-start justify-between gap-4 mb-6">
		<div>
			<h1 className="font-moda text-3xl text-[#021B3E]">{title}</h1>
			{description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
		</div>
		{action}
	</div>
);

export default PageHeader;
