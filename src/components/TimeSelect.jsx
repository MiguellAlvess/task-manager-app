import InputLabel from './InputLabel'

const TimeSelect = () => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 text-[#9A9C9F] outline-[#00ADB5] placeholder:text-sm"
      >
        <option value="morning">Manha</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </div>
  )
}

export default TimeSelect
