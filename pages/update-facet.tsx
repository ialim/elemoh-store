import UpsertFacet from "../components/upsert-facet";
import { validateToken } from "../lib/auth";
import prisma from "../lib/prisma";

const UpdateFacets = ({ facet }: any) => {
  return <UpsertFacet action="update" facet={facet} />;
};

UpdateFacets.displayName = "UpdateFacets";

export const getServerSideProps = async ({ query, req }: any) => {
  try {
    const token = validateToken(req.cookies.TRAX_ACCESS_TOKEN);

    let facet;
    if (token) {
      facet = await prisma.facet.findUnique({
        where: { id: +query.id },
        include: { values: true },
      });
    }
    return { props: { facet } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default UpdateFacets;
