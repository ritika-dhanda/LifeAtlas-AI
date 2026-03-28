import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";

function Entries() {

  return (

    <div>

      <h2 className="text-2xl font-bold mb-4">
        Your Activities
      </h2>

      <EntryForm />

      <EntryList />

    </div>

  );

}

export default Entries;