const Input = ({icon:Icon,...props}) => {
  return (
    <div className='w-full relative'>
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<Icon className='size-5 text-(--news-color)' />
			</div>
			<input
				{...props}
				className='w-full pl-10 pr-3 py-2 rounded-lg border border-(--news-color)' 
			/>
		</div>
  )
}

export default Input