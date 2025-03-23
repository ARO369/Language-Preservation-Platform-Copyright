use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg,
    program_error::ProgramError, pubkey::Pubkey,
};

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    // Deserialize the instruction data
    let json_data = String::from_utf8(instruction_data.to_vec())
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    // Get the account to write to
    let account = &accounts[0];

    // Check if the account is writable
    if !account.is_writable {
        return Err(ProgramError::InvalidAccountData);
    }

    // Write data to the account's data field
    let data_len = json_data.len();
    account.data.borrow_mut()[..data_len].copy_from_slice(json_data.as_bytes());

    msg!("Stored JSON data: {}", json_data);

    Ok(())
}
