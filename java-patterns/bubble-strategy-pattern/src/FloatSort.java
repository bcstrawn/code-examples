
public class FloatSort implements DataType {
	private float[] nums = null;

	@Override
	public void swap(int index) {
		float temp = this.nums[index];
		this.nums[index] = this.nums[index+1];
		this.nums[index+1] = temp;
	}

	@Override
	public boolean outOfOrder(int index) {
		return (this.nums[index] > this.nums[index+1]);
	}

	@Override
	public int length() {
		return this.nums.length;
	}

	@Override
	public void setArray(Object array) {
		this.nums = (float[])array;
	}

}
