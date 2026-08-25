function DropDrown({ tittle, option, func }) {
  return (
    <div className="w-[20%] select">
      <select
        onChange={func}
        className="w-full h-10 bg-zinc-800 text-white px-3 rounded"
        defaultValue="all"
        name="format"
        id="format"
      >
        <option value="all" disabled>
          {tittle}
        </option>

        {option.map((s,i) => {
          return (
            <option key={i} value={s}>
              {s.toUpperCase()}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default DropDrown;