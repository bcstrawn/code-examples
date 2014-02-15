
public class FloatBubble extends Bubble {

	private float[] nums = null;
	
	public void sort(float[] nums) {
		this.nums = nums;
		this.length = nums.length;
		doSort();
	}

	@Override
	protected void swap(int i) {
		float temp = this.nums[i];
		this.nums[i] = this.nums[i+1];
		this.nums[i+1] = temp;
	}

	@Override
	protected boolean outOfOrder(int i) {
		return (this.nums[i] > this.nums[i+1]);
	}

}
