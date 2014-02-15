
public class StringSort implements DataType {
	private String[] nums = null;
	
	@Override
	public void swap(int index) {
		String temp = this.nums[index];
		this.nums[index] = this.nums[index+1];
		this.nums[index+1] = temp;
	}

	@Override
	public boolean outOfOrder(int index) {
		return (Integer.parseInt(this.nums[index]) > 
		Integer.parseInt(this.nums[index+1]));
	}

	@Override
	public int length() {
		return this.nums.length;
	}

	@Override
	public void setArray(Object array) {
		this.nums = (String[])array;
	}

}
