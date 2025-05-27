import { Article } from "@/types/article.type";
import { dateFormatter } from "@/utils/date-formatter";
import { limitWords } from "@/utils/limit-words";
import Image from "next/image";
import Link from "next/link";

type Props = {
   article: Article;
};

export const ArticleCard = ({ article }: Props) => {
   return (
      <div className="w-80 h-full space-y-4">
         <div className="h-52 overflow-hidden rounded-xl">
            <Link href={`/user/home/${article.id}`}>
               {article.imageUrl ? (
                  <Image
                     src={article.imageUrl}
                     alt={article.title}
                     width={387}
                     height={240}
                     priority
                     className="object-cover w-full h-full"
                  />
               ) : (
                  <div className="h-52 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
                     No Image
                  </div>
               )}
            </Link>
         </div>
         <div className="space-y-2">
            <h6 className="text-sm text-slate-600">{dateFormatter(article.createdAt)}</h6>
            <h4 className="text-base font-semibold text-slate-900">{article.title}</h4>
            <p
               className="text-sm text-slate-600"
               dangerouslySetInnerHTML={{ __html: limitWords(article.content) }}
            />
         </div>
      </div>
   );
};
