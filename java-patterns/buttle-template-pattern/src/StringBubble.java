
public class StringBubble extends Bubble {
	private String[] nums = null;
	
	public void sort(String[] nums) {
		this.nums = nums;
		this.length = nums.length;
		doSort();
	}

	@Override
	protected void swap(int i) {
		String temp = this.nums[i];
		this.nums[i] = this.nums[i+1];
		this.nums[i+1] = temp;
	}

	@Override
	protected boolean outOfOrder(int i) {
		return (Integer.parseInt(this.nums[i]) > 
		Integer.parseInt(this.nums[i+1]));
	}
}
