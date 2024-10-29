import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { listStore } from "../stores/ListStore";
import { toJS } from "mobx";

const ReposList = observer(() => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadRepos = async () => {
      if (listStore.repos.length === 0 && !listStore.loading) {
        await listStore.fetchRepos();
        console.log(toJS(listStore.repos));
      }
    };

    loadRepos();
  }, []);

  if (listStore.loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Список репозиториев</div>
      <ul>
        {listStore.repos.map(
          (
            repo // используем map для рендеринга
          ) => (
            <li key={repo.id}>{repo.name}</li>
          )
        )}
      </ul>
    </>
  );
});

export default ReposList;
